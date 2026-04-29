package com.projetotea.api.DTO;

import com.projetotea.domain.model.StatusAtendimento;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AtendimentoFiltroDTO {

    private List<StatusAtendimento> status;
    private LocalTime horaInicio;
    private LocalTime horaFim;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private List<Long> pacienteIds;


}
