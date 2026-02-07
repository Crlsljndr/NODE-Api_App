import pool from '../config/db';

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
}

export async function createUser(user: User) {
    const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [user.username, user.email, user.password]
    );
    return result;
}

export async function findUserByEmail(email: string) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return (rows as User[])[0];
}
