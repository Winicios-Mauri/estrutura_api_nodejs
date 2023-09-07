import Mail from '../../lib/Mail';

class WelcomeEmailJob {
  // eslint-disable-next-line class-methods-use-this
  get key() {
    return 'WelcomeEmailJob';
  }

  // eslint-disable-next-line class-methods-use-this
  async handle({ data }) {
    const { email, name } = data;
    Mail.send({
      to: email,
      subject: 'Bem Vindo',
      text: `Ola ${name} bem vindo ao nosso sistema`,
    });
  }
}

export default new WelcomeEmailJob();
