import {Selector} from 'testcafe';

const config = require('../config/config');

const operatingSystems = [
    "WINDOWS WORKSTATION",
    "WINDOWS SERVER",
    "MAC"
];

operatingSystems.forEach(os => {
    fixture`Device renaming`
        .page`${config.baseUrl}/`;

    test(`Rename the first device to ${os} and verify it`, async t => {
        // Make API call to get the list of devices
        const response = await t.request({
            url: config.apiUrl,
            method: 'GET'
        });
        const firstDevice = response.body[0];

        // Rename the first device of the API with request
        await t.request({
            url: `${config.apiUrl}/${firstDevice.id}`,
            method: 'PUT',
            body: {
                system_name: `Renamed Device ${os}`,
                type: os,
                hdd_capacity: "500"
            },
        });

        // Reload the page
        await t.eval(() => location.reload(true));

        // Assert that the renamed device is displayed correctly in the list
        const renamedDevice = Selector('.device-info').withText(`Renamed Device ${os}`);

        await t
            .expect(renamedDevice.find('.device-name').visible).ok()
            .expect(renamedDevice.find('.device-name').innerText).eql(`Renamed Device ${os}`)
            .expect(renamedDevice.find('.device-type').visible).ok()
            .expect(renamedDevice.find('.device-type').innerText).eql(os)
    });
});
