/**
 * RideController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Sobreescribiendo rutas 
  async create(req, res) {
    try {
      let params = req.allParams();
      const ride = await Ride.create(
        {
          title: params.title,
          start: params.start,
          end: params.end,
          wayPoints: params.wayPoints,
          user: req.user,
        }
      ).fetch();
      return res.ok(ride);
    } catch (error) {
      res.serverError({error});
    }
  }
};

