import {
    Selector
} from 'testcafe';
const config = require('../config/config');

import axios from 'axios';

fixture`Device renaming`
.page `${config.baseUrl}/`;

test('Rename the first device and verify it', async t => {
    // Make API call to get the list of devices
    const response = await axios.get(config.apiUrl);
    const firstDevice = response.data[0];

    // Rename the first device via API
    await axios.put(`${config.apiUrl}/${firstDevice.id}`, {
        "system_name": "Renamed Device1",
        "type": "MAC",
        "hdd_capacity": "500"
    });

    // Reload the page
    await t.eval(() => location.reload(true));

    //Assert that the new device is displayed correctly in the list
    const renamedDevice = Selector('.device-info').withText('Renamed Device1');

    await t
        .expect(renamedDevice.find('.device-name').visible).ok()
        .expect(renamedDevice.find('.device-name').innerText).eql('Renamed Device1')
});