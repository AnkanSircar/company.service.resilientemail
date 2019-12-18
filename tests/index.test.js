const {expect} = require('chai');
const config =  require('config');
const server = require('../src/server/server-dev');

describe('Server', ()=>{
    it('tests that server is running at current port', async() => {
        expect(server.port).to.equal(config.get('port'));        
    });
});
