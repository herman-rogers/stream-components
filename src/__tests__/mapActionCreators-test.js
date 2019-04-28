import '@babel/polyfill';
import { mapActionCreators } from '../';
import { getAdapter } from '../rxConnect';

describe('map action creators', () => {
  const { Rx } = getAdapter();

  it('passes non-observables as is', async () => {
    const props = await mapActionCreators({ a: 123, b: 'hi!' }).toPromise();

    expect(props).toMatchSnapshot();
  });

  it('strips dollar sign from Observable property names', async () => {
    const actions = {
      a$: new Rx.Subject()
    };

    const props = await mapActionCreators(actions).toPromise();

    expect(props).toMatchSnapshot();
  });

  it('creates FuncSubject-like action', async () => {
    const actions = {
      a$: new Rx.BehaviorSubject()
    };

    const props = await mapActionCreators(actions).toPromise();

    props.a(1, 2, 3);

    expect(actions.a$.getValue()).toMatchSnapshot();
  });
});
