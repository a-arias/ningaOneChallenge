import {
    Selector
} from 'testcafe';
const config = require('../conf/conf.json');
import axios from 'axios';

fixture`Device Creation`
.page `${config.baseUrl}/`;

test('Create a new device and verify it is visible', async t => {
    //creating device information object
    const deviceInformation = {
        name: "my new Device",
        operatingSystemOption: {
            one: "WINDOWS WORKSTATION",
            two: "WINDOWS SERVER",
            three: "MAC"
        },
        hdd_capacity: "512",
    }

    //create select strategy
    const typeSelection = Selector('#type');
    const operatingSystemOption = typeSelection.find('option');

    //click add new device button
    await t
        .click('.submitButton');

    // Fill in the device information with the device object information
    await t
        .typeText('#system_name', deviceInformation.name)
        .click(typeSelection)
        .click(operatingSystemOption.withText(deviceInformation.operatingSystemOption.one))
        .typeText('#hdd_capacity', deviceInformation.hdd_capacity)
        .click('.submitButton');


    // Assert that the new device is displayed correctly in the list
    const newDeviceElement = Selector('.device-info').withText(deviceInformation.name);
    await t
        .expect(newDeviceElement.find('.device-name').visible).ok()
        .expect(newDeviceElement.find('.device-name').innerText).eql(deviceInformation.name)
        .expect(newDeviceElement.find('.device-type').visible).ok()
        .expect(newDeviceElement.find('.device-type').innerText).eql(deviceInformation.operatingSystemOption.one)
        .expect(newDeviceElement.find('.device-capacity').visible).ok()
        .expect(newDeviceElement.find('.device-capacity').innerText).eql(`${deviceInformation.hdd_capacity} GB`);
});