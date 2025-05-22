import { Router } from 'express';
import { Software } from '../entity/Software'; 
import { AppDataSource } from '../data-source';  

const router = Router();

router.get('/software', async (req, res) => {
  const softwareRepo = AppDataSource.getRepository(Software);
  const all = await softwareRepo.find();
  res.json(all);
});

export default router;
