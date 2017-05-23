# Hal api

### WIP see [milestones](https://github.com/MattAndDev/hal-api/milestone/1)

### Goal
This project aims to provide an easy to set up http api to control and retrieve data from a raspberry pi.

### Why
- I just can't get some sleep.
- You can have somebody sending you a led text message like this `https://rasp-pi.domain/sense/write/hi_matt` *how cool is that*!


## System requirements

### Core
- Raspbian Jessie 8.0
- node v6.10.3 (use [nvm](https://github.com/creationix/nvm) && [pm2](https://github.com/Unitech/pm2)!)
- npm v3.10.10 (use [nvm](https://github.com/creationix/nvm) && [pm2](https://github.com/Unitech/pm2)!)

### Endpoints dependencies/requirements
- `/sense/*`
  - hardware: [sense hat](https://www.raspberrypi.org/products/sense-hat/) (mounted and working, no checks)
  - sys: `sense-hat` [package](https://www.raspberrypi.org/documentation/hardware/sense-hat/) (python)


## Permission requirements
**sudo**
As know the api needs to be run with sudo privileges (no good!), because of the inability to access the sense-hat data on the rasp-pi. Looking for a workaround.
