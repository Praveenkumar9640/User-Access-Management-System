import { Request as Req, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Request } from '../entity/Request';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';

const requestRepo = AppDataSource.getRepository(Request);
const userRepo = AppDataSource.getRepository(User);

export const createRequest = async (req: Req, res: Response) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ message: 'Missing token' });

  const decoded = jwt.verify(auth, process.env.JWT_SECRET!) as any;
  const user = await userRepo.findOneBy({ id: decoded.id });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { software, accessType, reason } = req.body;
  const newReq = requestRepo.create({ software, accessType, reason, user });
  await requestRepo.save(newReq);

  res.status(201).json({ message: 'Access request submitted' });
};
