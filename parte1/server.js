const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // El puerto en el que se ejecutará el servicio web

app.get('/resumen/:fecha', async (req, res) => {
  const { fecha } = req.params;
  const { dias } = req.query;
  const endDate = new Date(fecha);
  endDate.setDate(endDate.getDate() + parseInt(dias) - 1);

  // Realiza la solicitud al API para obtener los datos de los días especificados
  try {
    const response = await axios.get(`https://apirecruit-gjvkhl2c6a-uc.a.run.app/compras/${fecha}`);
    const data = response.data;

    // Inicializa las variables para calcular las estadísticas
    let total = 0;
    const comprasPorTDC = {
      oro: 0,
      amex: 0,
    };
    let noCompraron = 0;
    let compraMasAlta = 0;

    // Procesa los datos para calcular las estadísticas
    data.forEach((registro) => {
      const registroDate = new Date(registro.date);

      // Verifica si el registro está dentro del rango de fechas especificado
      if (registroDate >= new Date(fecha) && registroDate <= endDate) {
        total += registro.monto || 0;

        if (registro.compro) {
          const tdc = registro.tdc || 'otra';
          comprasPorTDC[tdc] = (comprasPorTDC[tdc] || 0) + (registro.monto || 0);

          if (registro.monto > compraMasAlta) {
            compraMasAlta = registro.monto;
          }
        } else {
          noCompraron++;
        }
      }
    });

    // Construye la respuesta JSON
    const resumen = {
      total: total.toFixed(2),
      comprasPorTDC,
      noCompraron,
      compraMasAlta: compraMasAlta.toFixed(2),
    };

    res.json(resumen);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar el API' });
  }
});

app.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
