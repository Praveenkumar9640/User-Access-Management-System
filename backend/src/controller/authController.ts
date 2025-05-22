import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';

const userRepo = AppDataSource.getRepository(User);

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existing = await userRepo.findOneBy({ username });
  if (existing) return res.status(400).json({ message: 'User exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = userRepo.create({ username, password: hashed });
  await userRepo.save(user);

  res.status(201).json({ message: 'User created' });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await userRepo.findOneBy({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.json({ token, role: user.role });
};

