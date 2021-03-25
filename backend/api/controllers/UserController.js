const Joi = require('joi');
const bcrypt = require('bcrypt');

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi
          .string()
          .required()
          .email(),
        password: Joi.string().required()
      });

      const {value:{email, password}} = await schema.validate(req.allParams());
      
      // Implementando bcrypt para cifrar contraseña
      const hashPassword = bcrypt.hashSync(password, 10);
    
      // Crear el nodo en la DB por medio del metodo create de sailsjs
      const user = await User.create({email:email, password:hashPassword }).fetch();
      // Retornamos una respuesta
      return res.ok(user);

    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.badRequest({ error }).json();
      }
      return res.serverError({ error }).json();
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi
          .string()
          .required()
          .email(),
        password: Joi.string().required()
      });

      const {value:{email, password}} = await schema.validate(req.allParams());
      
      // Consultamos registros en la DB
      const user = await User.findOne({email: email});

      if (!user) {
        return res.notFound();
      }
      
      // Comparacion de contraseñas con bcrypt
      const  comparedPassword = await bcrypt.compare(password, user.password);

      // Realizamos una condicion
      return (comparedPassword) ? res.ok(user) : res.badRequest({error: 'Unauthorized'});

    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.badRequest({ error }).json();
      }
      return res.serverError({ error }).json();
    }
  }
};
