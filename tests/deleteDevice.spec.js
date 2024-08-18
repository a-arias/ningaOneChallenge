import { Selector } from 'testcafe';
import axios from 'axios';

fixture`Delete Device`
    .page`http://localhost:3001/`;

    test('Delete the last device and verify it is removed from the list', async t => {
        // Make API call to get the list of devices
        const response = await axios.get('http://localhost:3000/devices');
        const lastDevice = response.data[response.data.length - 1];
        console.log(lastDevice)

        // Delete the last device via API
        await axios.delete(`http://localhost:3000/devices/${lastDevice.id}`);
    
        // Reload the page and verify the device is removed
        await t.eval(() => location.reload(true));

        //Assert that the deleted device is not being displayed on the list.
        const deletedDeviceElement = Selector('.device-info').withText(lastDevice.system_name);
        await t
            .expect(deletedDeviceElement.exists).notOk();
    });