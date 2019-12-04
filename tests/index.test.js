const {expect} = require('chai');
const config =  require('config');
const server = require('../src/app');

describe('Server', ()=>{
    it('tests that server is running at current port', async() => {
        expect(server.port).to.equal(config.get('port'));        
    });
});
