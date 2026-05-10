package com.projetotea.domain.service;

import com.projetotea.api.DTO.AtendimentoFiltroDTO;
import com.projetotea.api.DTO.AtendimentoInputDTO;
import com.projetotea.api.DTO.AtendimentoResponseDTO;
import com.projetotea.api.DTO.UsuarioIdInputDTO;
import com.projetotea.api.assembler.AtendimentoDTOAssembler;
import com.projetotea.api.assembler.AtendimentoDTODisassembler;
import com.projetotea.core.security.TeaSecurity;
import com.projetotea.domain.exception.HorarioEmConflitoException;
import com.projetotea.domain.exception.NegocioException;
import com.projetotea.domain.exception.PacienteNotFoundException;
import com.projetotea.domain.exception.UsuarioNotFoundException;
import com.projetotea.domain.model.Atendimento;
import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.StatusAtendimento;
import com.projetotea.domain.model.Usuario;
import com.projetotea.infrastructure.repository.AtendimentoRepository;
import com.projetotea.infrastructure.repository.PacienteRepository;
import com.projetotea.infrastructure.repository.UsuarioRepository;
import com.projetotea.infrastructure.spec.AtendimentoSpec;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AtendimentoService {

    private final AtendimentoRepository atendimentoRepository;
    private final AtendimentoDTOAssembler atendimentoDTOAssembler;
    private final AtendimentoDTODisassembler atendimentoDTODisassembler;
    private final TeaSecurity teaSecurity;
    private final UsuarioRepository usuarioRepository;
    private final PacienteRepository pacienteRepository;


    public Page<AtendimentoResponseDTO> buscarComFiltro(AtendimentoFiltroDTO filtro, Pageable pageable) {
        Long usuarioId = teaSecurity.getUsuarioId();
        return atendimentoRepository.findAll(
                AtendimentoSpec.comFiltros(filtro, usuarioId), pageable)
                .map(atendimentoDTOAssembler::toResponseDTO);
    }
    @Transactional
    public AtendimentoResponseDTO criar(AtendimentoInputDTO atendimentoInputDTO) {
        Set<Usuario> usuarios = checarUsuarioAtendimento(atendimentoInputDTO);
        Paciente paciente = pacienteRepository.findById(atendimentoInputDTO.getPaciente().getId())
                .orElseThrow(() -> new PacienteNotFoundException());

        Atendimento atendimento = atendimentoDTODisassembler.toEntity(atendimentoInputDTO);
        checarHorario(atendimento);

        atendimento.setPaciente(paciente);
        atendimento.setUsuarios(usuarios);

        atendimento.setStatus(StatusAtendimento.AGENDADO);

        Atendimento salvo = atendimentoRepository.save(atendimento);

        return atendimentoDTOAssembler.toResponseDTO(salvo);
    }
    public void checarHorario(Atendimento atendimento) {

        if (!atendimento.getHoraInicio().isBefore(atendimento.getHoraFim())) {
            throw new NegocioException("Hora início deve ser antes da hora fim");
        }
        if(atendimento.getDataAtendimento().isBefore(LocalDate.now())){
            throw new NegocioException("Data não pode estar no passado");
        }
        if(atendimento.getDataAtendimento().isEqual(LocalDate.now())
                && atendimento.getHoraInicio().isBefore(LocalTime.now())) {
            throw new NegocioException("Hora não pode estar no passado");
        }
        boolean conflitoPaciente = atendimentoRepository.existsConflitoPaciente(
                atendimento.getDataAtendimento(), atendimento.getHoraFim(),
                atendimento.getHoraInicio(), atendimento.getPaciente().getId()
        );

        boolean conflitoUsuarios = atendimentoRepository.existsConflitoUsuarios(
                atendimento.getDataAtendimento(), atendimento.getHoraFim(),
                atendimento.getHoraInicio(), atendimento.getUsuarios().stream()
                        .map(Usuario::getId)
                        .toList());
        if(conflitoUsuarios || conflitoPaciente) {
            throw new HorarioEmConflitoException();
        }


    }

    public Set<Usuario> checarUsuarioAtendimento(AtendimentoInputDTO dto) {
        Usuario usuarioLogado = findUserOrNot(teaSecurity.getUsuarioId());
        Set<Usuario> usuarios = new HashSet<>();
        usuarios.add(usuarioLogado);
        if(dto.getUsuarios() != null) {
            List<Long> ids = dto.getUsuarios().stream()
                    .map(u -> u.getId())
                    .toList();
            List<Usuario> usuariosEncontrados = usuarioRepository.findAllById(ids);

            usuariosEncontrados.stream()
                    .filter(u -> !u.getId().equals(usuarioLogado))
                    .forEach(usuarios::add);

        }
        return usuarios;
    }
    public Usuario findUserOrNot(Long id) {

        return usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException());
    }
}
