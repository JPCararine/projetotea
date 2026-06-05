package com.projetotea.domain.service;

import com.projetotea.api.DTO.AvaliacaoProtocoloDTO;
import com.projetotea.api.DTO.AvaliacaoProtocoloInputDTO;
import com.projetotea.api.assembler.AvaliacaoProtocoloDTOAssembler;
import com.projetotea.api.assembler.AvaliacaoProtocoloDTODisassembler;
import com.projetotea.domain.exception.AvaliacaoProtocoloNotFoundException;
import com.projetotea.domain.exception.NegocioException;
import com.projetotea.domain.model.AvaliacaoProtocolo;
import com.projetotea.infrastructure.repository.AvaliacaoProtocoloRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AvaliacaoProtocoloService {

    private final AvaliacaoProtocoloRepository avaliacaoProtocoloRepository;
    private final AvaliacaoProtocoloDTOAssembler avaliacaoProtocoloDTOAssembler;
    private final AvaliacaoProtocoloDTODisassembler avaliacaoProtocoloDTODisassembler;

    public List<AvaliacaoProtocoloDTO> listarAtivos() {
        return avaliacaoProtocoloRepository.findByAtivoTrueOrderByNomeAscVersaoAsc()
                .stream()
                .map(avaliacaoProtocoloDTOAssembler::toDTO)
                .toList();
    }

    public AvaliacaoProtocoloDTO buscar(Long protocoloId) {
        return avaliacaoProtocoloDTOAssembler.toDTO(findOrFail(protocoloId));
    }

    @Transactional
    public AvaliacaoProtocoloDTO criar(AvaliacaoProtocoloInputDTO inputDTO) {
        avaliacaoProtocoloRepository.findByCodigoAndVersao(inputDTO.getCodigo(), inputDTO.getVersao())
                .ifPresent(protocolo -> {
                    throw new NegocioException("Já existe um protocolo com este código e versão.");
                });

        AvaliacaoProtocolo protocolo = avaliacaoProtocoloDTODisassembler.toEntity(inputDTO);
        return avaliacaoProtocoloDTOAssembler.toDTO(avaliacaoProtocoloRepository.save(protocolo));
    }

    @Transactional
    public AvaliacaoProtocoloDTO atualizar(Long protocoloId, AvaliacaoProtocoloInputDTO inputDTO) {
        AvaliacaoProtocolo protocolo = findOrFail(protocoloId);
        avaliacaoProtocoloDTODisassembler.copyToDomainObject(inputDTO, protocolo);
        return avaliacaoProtocoloDTOAssembler.toDTO(protocolo);
    }

    private AvaliacaoProtocolo findOrFail(Long protocoloId) {
        return avaliacaoProtocoloRepository.findById(protocoloId)
                .orElseThrow(() -> new AvaliacaoProtocoloNotFoundException(protocoloId));
    }

}
