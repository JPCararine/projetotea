package com.projetotea.domain.service;

import com.projetotea.api.DTO.CategoriaUsuario.CategoriaUsuarioInputDTO;
import com.projetotea.api.DTO.UsuarioDTO;
import com.projetotea.api.DTO.UsuarioIdNomeEmail;
import com.projetotea.api.DTO.UsuarioInputDTO;
import com.projetotea.api.assembler.UsuarioDTOAssembler;
import com.projetotea.api.assembler.UsuarioDTODisassembler;
import com.projetotea.domain.exception.EmailJaExistente;
import com.projetotea.domain.exception.UsuarioNotFoundException;
import com.projetotea.domain.model.Usuario;
import com.projetotea.infrastructure.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class UsuarioServiceTest {

    @Mock UsuarioRepository usuarioRepository;
    @Mock UsuarioDTOAssembler assembler;
    @Mock UsuarioDTODisassembler disassembler;
    @Mock PasswordEncoder passwordEncoder;

    @InjectMocks UsuarioService service;

    @Test
    void findAll_deveRetornarListaDTO() {
        Usuario u = new Usuario(); u.setId(1L);
        UsuarioDTO dto = new UsuarioDTO();

        when(usuarioRepository.findAll()).thenReturn(List.of(u));
        when(assembler.toDTO(u)).thenReturn(dto);

        List<UsuarioDTO> result = service.findAll();

        assertEquals(1, result.size());
        assertEquals(dto, result.get(0));
        verify(usuarioRepository).findAll();
        verify(assembler).toDTO(u);
    }

    @Test
    void findById_quandoNaoExiste_deveLancar() {
        when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(UsuarioNotFoundException.class, () -> service.findById(99L));
        verify(usuarioRepository).findById(99L);
    }

    @Test
    void create_happyPath_deveSalvarComSenhaHash() {
        UsuarioInputDTO input = new UsuarioInputDTO(
                "Joao",
                "a@a.com",
                "123",
                "52998224725",
                "11999999999",
                CategoriaUsuarioInputDTO.PROFISSIONAL
        );

        Usuario entity = new Usuario();
        Usuario saved = new Usuario(); saved.setId(10L);
        UsuarioIdNomeEmail out = new UsuarioIdNomeEmail();

        when(usuarioRepository.findByEmail("a@a.com")).thenReturn(Optional.empty());
        when(disassembler.toEntity(input)).thenReturn(entity);
        when(passwordEncoder.encode("123")).thenReturn("HASH");
        when(usuarioRepository.save(entity)).thenReturn(saved);
        when(assembler.toIdNomeEmailDTO(saved)).thenReturn(out);

        UsuarioIdNomeEmail result = service.create(input);

        assertEquals(out, result);
        assertEquals("HASH", entity.getSenha());
        verify(passwordEncoder).encode("123");
        verify(usuarioRepository).save(entity);
    }

    @Test
    void create_quandoEmailExiste_deveLancar() {
        UsuarioInputDTO input = new UsuarioInputDTO(
                "Joao",
                "dup@a.com",
                "123",
                "52998224725",
                "11999999999",
                CategoriaUsuarioInputDTO.PROFISSIONAL
        );

        Usuario existente = new Usuario(); existente.setId(1L);
        when(usuarioRepository.findByEmail("dup@a.com")).thenReturn(Optional.of(existente));

        assertThrows(EmailJaExistente.class, () -> service.create(input));
        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void buscarUsuarioOuFalhar_happyPath() {
        Usuario u = new Usuario(); u.setId(1L);
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(u));

        Usuario result = service.buscarUsuarioOuFalhar(1L);

        assertEquals(1L, result.getId());
        verify(usuarioRepository).findById(1L);
    }

    @Test
    void checarEmail_quandoMesmoId_naoLanca() {
        Usuario u = new Usuario(); u.setId(1L);
        when(usuarioRepository.findByEmail("x@x.com")).thenReturn(Optional.of(u));

        assertDoesNotThrow(() -> service.checarEmail("x@x.com", 1L));
        verify(usuarioRepository).findByEmail("x@x.com");
    }
}
