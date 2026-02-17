import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        console.log('Register request:', { name, email, passwordLength: password?.length })
        
        if (!name || !email || !password) {
            console.log('Missing fields validation failed')
            return res.status(400).json({ msg: 'name, email, and password are required' })
        }
        
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log('User already exists:', email)
            return res.status(400).json({ msg: 'Email already registered' })
        }
        
        const hashed = await bcrypt.hash(password, 10)
        console.log('Password hashed, creating user...')
        const user = await User.create({ name, email, password: hashed })
        console.log('User created:', user._id)
        res.json(user)
    } catch (err) {
        console.error('Register error:', err.message)
        res.status(500).json({ msg: 'Server error', error: err.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log('Login request:', { email, passwordLength: password?.length })
        
        if (!email || !password) {
            return res.status(400).json({ msg: 'email and password are required' })
        }
        
        const user = await User.findOne({ email })
        console.log('User found:', user ? 'YES' : 'NO')
        if (!user) return res.status(400).json({ msg: 'invalid credentials' })
        
        const match = await bcrypt.compare(password, user.password)
        console.log('Password match result:', match)
        if (!match) return res.status(400).json({ msg: 'invalid credentials' })
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        console.log('Token generated')
        res.json({ token })
    } catch (err) {
        console.error('Login error:', err.message)
        res.status(500).json({ msg: 'Server error', error: err.message })
    }
}
