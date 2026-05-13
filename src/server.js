const express = require('express');
const pl = require('tau-prolog');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = 3000;

// 1. Cargar la base de conocimiento al iniciar
const kbPath = path.join(__dirname, 'base_conocimiento.pl');
const program = fs.readFileSync(kbPath, 'utf8');

app.post('/query', (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: "Falta la consulta lógica en el body." });
    }

    // Inicializar sesión de Tau Prolog
    const session = pl.create();
    
    session.consult(program, {
        success: function() {
            // Ejecutar la consulta del usuario
            session.query(query, {
                success: function() {
                    let results = [];
                    
                    // Buscar todas las soluciones posibles (backtracking)
                    const getAnswers = () => {
                        session.answer({
                            success: function(answer) {
                                // Formatear la respuesta de la unificación
                                results.push(session.format_answer(answer));
                                getAnswers(); // Sigue buscando
                            },
                            fail: function() {
                                // Ya no hay más respuestas
                                res.json({
                                    status: "success",
                                    query: query,
                                    results: results
                                });
                            },
                            error: function(err) {
                                res.status(500).json({ error: "Error en la inferencia", details: err.toString() });
                            }
                        });
                    };
                    getAnswers();
                },
                error: function(err) {
                    res.status(400).json({ error: "Consulta mal formada", details: err.toString() });
                }
            });
        },
        error: function(err) {
            res.status(500).json({ error: "Error al cargar la base de conocimiento", details: err.toString() });
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Motor de Inferencia listo en http://localhost:${PORT}`);
});