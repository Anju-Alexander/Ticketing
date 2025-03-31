import express from 'express';

const router = express.Router();

router.get('/api/users/signout', (req,res)=>{

  res.send('Hi signout');
});


// router.post('/api/users/signout', (req, res) => {
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error('Session destruction error:', err);
//         return res.status(500).send({ error: 'Could not sign out' });
//       }
//       res.send({});
//     });
//   } else {
//     res.send({});
//   }
// });

export { router as signoutRouter };