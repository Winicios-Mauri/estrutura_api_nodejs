class DummyJob {
  // eslint-disable-next-line class-methods-use-this
  get key() {
    return 'Dummy';
  }

  // eslint-disable-next-line class-methods-use-this
  async handle({ data }) {
    const { message } = data;

    console.log(message);
  }
}

export default new DummyJob();
