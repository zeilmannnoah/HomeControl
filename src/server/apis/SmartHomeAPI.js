// TODO: Set static ip for tplink
const { Client } = require('tplink-smarthome-api');
const client = new Client()
const SmartHomeAPI = {
    devices: []
}

SmartHomeAPI.lookForPlugs = () => {
    return new Promise((resolve, reject) => {
        client.startDiscovery().on('device-new', (device) => {
            device.getSysInfo().then(info => {
                device.getPowerState().then(state => {
                    SmartHomeAPI.devices.push({
                        device: device,
                        data: { 
                            info: info,
                            state: state
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });
        });
        setTimeout(() => {
            resolve(SmartHomeAPI.devices);
        }, 5000);
    });
}

SmartHomeAPI.toggleDevice = (deviceId) => {
    return new Promise((resolve, reject) => {
        let devices;

        if (!deviceId) {
            reject('Missing parameter device id');
        }
        
        devices = SmartHomeAPI.devices.filter(i => i.data.info.deviceId === deviceId)
        
        if (devices.length > 1) {
            reject('More than one device found');
        }
        else if (devices.length === 0) {
            reject('No device found');
        }

        devices[0].device.togglePowerState()
        .then(res => {
            let index = SmartHomeAPI.devices.indexOf(devices[0]);
            SmartHomeAPI.devices.splice(index, 1, {
                device: devices[0].device,
                data: { 
                    info: devices[0].data.info,
                    state: res
                }
            });
            resolve(res);
        })
        .catch(err => {
            reject(err);
        });
    });
}

module.exports = SmartHomeAPI;