const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 8000;

app.post('/', async (req, res) => {
  const deviceID = req.body.deviceID;
  const deviceMAC = req.body.deviceMAC;
  const dimmingLevel = req.body.dimmingLevel;
  console.log(`Request received for ${deviceID} and ${deviceMAC} for Dimming level: ${dimmingLevel}`);
  const config = {
    headers: {
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0.TUBBJ28da7bZXqAEsKzib0H7HS2VFMuYp-8hvNOAzCmnwLPdQoW8niOL5__ofDjHs-4IvXRlBXqNqLencTnx6jrXt6iat59Z.1KG-Ou78zM_KA5yWeUFmYg.u8vNkg_mPCUO1P9JZpPRdgNjIkenh5WDWOwYzVxnZtvEPjhebfjBWw6ginSQN9gL4wFoR-8zCTiuQpflzK4jQOPOxgamrCNn1RKqRfNrrx9sY2Nx0OyjnKmAIjVNh7DqZTN0285ZYG2Yg0u_H39iky0Uw_-TjANPODEWu_sFIN5TKCfCQUn337LEeAB0VGCy8SObsTC3umrTuzaV2xXjrsvlFxnmdOa8vxUBxc7hzeJnESkhpkbG0OAlJyV69NKT.PfSjwY02YTR62vjz4zPJdAEKZs7FS_WH0Sbwwsv3AYg',
    },
  };
  try {
    const reRes = await axios.put(
      `https://electromagnetica.pdxeng.ch:8000/cms/api/v1.0/devices/commands/id/${deviceID}`,
      {
        gateway_mac: deviceMAC,
        command_name: 'set_light_control',
        objects: [
          {
            object_id: 3311,
            instance_id: 0,
            resource_id: 5851,
            resource_value: dimmingLevel,
          },
        ],
      },
      config
    );

    if (reRes.status != 200) {
      throw 'Axios error';
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error occured: ' + error.message);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`MX Re-router listening on port ${port}`);
});
