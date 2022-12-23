import { atom } from 'recoil';

const showModalPage = atom({
  key: 'showModal',
  default: true,
});

export { showModalPage };
