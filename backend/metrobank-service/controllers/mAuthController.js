import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../db/db.js';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn:  3 * 24 * 60 * 60
    });
};

// Database queries
const QUERIES = {
    GET_USER_BY_EMAIL: 'SELECT * FROM users WHERE email = $1',
    CREATE_USER: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    GET_USER_BY_ID: 'SELECT id, name, email FROM users WHERE id = $1'
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const result = await pool.query(QUERIES.GET_USER_BY_EMAIL, [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Validate password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create token
        const token = createToken(user.id);

        // Set cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        // Remove password from response
        delete user.password;

        res.status(200).json({
            message: 'Login successful',
            user
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await pool.query(QUERIES.GET_USER_BY_EMAIL, [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const result = await pool.query(QUERIES.CREATE_USER, [
            name,
            email,
            hashedPassword
        ]);

        const newUser = result.rows[0];

        // Create token
        const token = createToken(newUser.id);

        // Set cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        // Remove password from response
        delete newUser.password;

        res.status(201).json({
            message: 'Registration successful',
            user: newUser
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const result = await pool.query(QUERIES.GET_USER_BY_ID, [decoded.id]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};