import {
    Selector
} from 'testcafe';
const config = require('../config/config');

import axios from 'axios';

fixture `Device List`
    .page `${config.baseUrl}/`;

let responseBody = null;
let sortedData = null;

test('Retrieve list of devices using API call and validate the devices are present on the web application with correct information', async t => {
    // Make an API call to retrieve the list of devices and save the reponse.
    const response = await axios.get(config.apiUrl);
    const apiDevices = response.data;

    // Iterate through the DOM elements that represent devices
    const deviceElements = Selector('.list-devices').child('.device-item');
    //get the number of devices.
    const deviceCount = await deviceElements.count;

    //Iterate through devices
    for (let i = 0; i < deviceCount; i++) {
        // Ensure the elements are visible before getting their text content
        await t
            .expect(deviceElements.nth(i).find('.device-name').visible).ok()
            .expect(deviceElements.nth(i).find('.device-type').visible).ok()
            .expect(deviceElements.nth(i).find('.device-capacity').visible).ok();

        const domDeviceName = await deviceElements.nth(i).find('.device-name').innerText;
        const domDeviceType = await deviceElements.nth(i).find('.device-type').innerText;
        const domDeviceCapacity = await deviceElements.nth(i).find('.device-capacity').innerText;

        // Find the corresponding device in the API data
        const matchedDevice = apiDevices.find(device => device.system_name === domDeviceName);

        // Assert that the matched device from the API is correctly displayed in the web page
        await t
            .expect(matchedDevice).ok(`Device with name "${domDeviceName}" not found in API response`)
            .expect(domDeviceName).eql(matchedDevice.system_name)
            .expect(domDeviceType).eql(matchedDevice.type)
            .expect(domDeviceCapacity).contains(matchedDevice.hdd_capacity);

        // Assert that the edit and delete buttons are present
        await t
            .expect(deviceElements.nth(i).find('.device-edit').visible).ok()
            .expect(deviceElements.nth(i).find('.device-remove').visible).ok();
    }
});