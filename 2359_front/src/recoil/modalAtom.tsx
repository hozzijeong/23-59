import { atom } from 'recoil';

const showModalPage = atom({
  key: 'showModal',
  default: false,
});

export { showModalPage };
