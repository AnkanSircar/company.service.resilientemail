import {expect} from 'chai';
import config from 'config';
import server from '../src/server/server-dev';

describe('Server', () => {
  it('tests that server is running at current port', async() => {
    expect(server.port).to.equal(config.get('port'));
  });
});
