import {
    Selector
} from 'testcafe';
const config = require('../config/config');

const operatingSystems = [
    "WINDOWS WORKSTATION",
    "WINDOWS SERVER",
    "MAC"
];

fixture`Devices Creation`
    .page `${config.baseUrl}/`;

operatingSystems.forEach(os => {
    test(`Create a new device with OS ${os} and verify it is visible`, async t => {
        //creating device information object
        const deviceInformation = {
            name: `my new Device ${os}`,
            operatingSystemOption: os,
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
            .click(operatingSystemOption.withText(deviceInformation.operatingSystemOption))
            .typeText('#hdd_capacity', deviceInformation.hdd_capacity)
            .click('.submitButton');

        // Assert that the new device is displayed correctly in the list
        const newDeviceElement = Selector('.device-info').withText(deviceInformation.name);
        await t
            .expect(newDeviceElement.find('.device-name').visible).ok()
            .expect(newDeviceElement.find('.device-name').innerText).eql(deviceInformation.name)
            .expect(newDeviceElement.find('.device-type').visible).ok()
            .expect(newDeviceElement.find('.device-type').innerText).eql(deviceInformation.operatingSystemOption)
            .expect(newDeviceElement.find('.device-capacity').visible).ok()
            .expect(newDeviceElement.find('.device-capacity').innerText).eql(`${deviceInformation.hdd_capacity} GB`);
    });
});


