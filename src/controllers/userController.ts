import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel';

const SECRET = process.env.JWT_SECRET || 'fallback_secret';

export async function register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login exitoso', token });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
