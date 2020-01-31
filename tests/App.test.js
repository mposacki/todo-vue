import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import VueRouter from 'vue-router';
import Vuex from 'vuex'
import App from '@/App';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const store = new Store({
  state: {
    idToken: 'notNull',
    userId: '',
    user: {
      name: '',
      sex: '',
      email: '',
      password: ''
    },
  },
  dispatch: jest.fn(),
  getters: jest.fn(),
});

const mocks = {
  $store: store,
};

const Sidebar = {
  props: ['isAuth'],
  template: '<div></div>'
};

afterEach(() => store.reset());

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, {
      localVue,
      router,
      mocks,
      stubs: {
        Sidebar: Sidebar
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Component is rendered', () => {
    expect(wrapper.is(App)).toBe(true);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('Component is named well', () => {
    expect(typeof App.name).toBe('string');
    expect(App.name).toEqual('app');
  });

  it('has a created hook', () => {
    expect(typeof App.created).toBe('function');
    expect(store.dispatch).toHaveBeenCalled()
  });

  it('dispatches "tryAutoLogin" when component has been created', () => {
    expect(store.dispatch).toHaveBeenCalled()
  });

  it('computed "auth" has ben called', () => {
    expect(typeof App.computed.auth).toBe('function');
  });
});
