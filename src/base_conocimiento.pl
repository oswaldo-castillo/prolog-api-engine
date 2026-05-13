% --- HECHOS ---
contrato(c101, activo).
contrato(c102, vencido).
entrega_tardia(c102).

% --- REGLAS ---
% Una penalización aplica si el contrato venció Y hubo entrega tardía.
penalizacion_aplicable(X) :- 
    contrato(X, vencido), 
    entrega_tardia(X).

% Regla general para saber si un contrato existe
existe_contrato(X) :- contrato(X, _).