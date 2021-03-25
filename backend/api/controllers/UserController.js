const Joi = require('joi');

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

      // Crear el nodo en la DB por medio del metodo create de sailsjs
      const user =await User.create({email:email, password:password}).fetch();
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
    return res.json({
      todo: 'login() is not implemented yet!'
    });
  }
};
