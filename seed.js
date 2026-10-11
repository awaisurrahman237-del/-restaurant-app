require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const Table = require('./models/Table');

const seedData = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await MenuItem.deleteMany({});
        await Table.deleteMany({});

        // 1. Seed Users
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create([
            { name: 'John Customer', email: 'customer@app.com', password: hashedPassword, role: 'customer' },
            { name: 'Admin Manager', email: 'manager@app.com', password: hashedPassword, role: 'manager' }
        ]);
        console.log('Users seeded successfully.');

        // 2. Seed Menu Items (15 items)
        await MenuItem.create([
            { name: 'Margherita Pizza', description: 'Classic cheese and tomato', price: 12.99, category: 'Mains', isAvailable: true },
            { name: 'Pepperoni Pizza', description: 'Spicy pepperoni with mozzarella', price: 14.99, category: 'Mains', isAvailable: true },
            { name: 'Chicken Alfredo Pasta', description: 'Creamy pasta with grilled chicken', price: 15.50, category: 'Mains', isAvailable: true },
            { name: 'Beef Burger', description: 'Juicy beef patty with cheddar cheese', price: 11.00, category: 'Mains', isAvailable: true },
            { name: 'Veggie Wrap', description: 'Fresh vegetables with hummus', price: 9.50, category: 'Mains', isAvailable: true },
            { name: 'Caesar Salad', description: 'Crispy romaine with Parmesan', price: 8.50, category: 'Starters', isAvailable: true },
            { name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 5.00, category: 'Starters', isAvailable: true },
            { name: 'Chicken Wings', description: 'Spicy buffalo wings with ranch', price: 10.00, category: 'Starters', isAvailable: true },
            { name: 'French Fries', description: 'Crispy golden fries', price: 4.50, category: 'Sides', isAvailable: true },
            { name: 'Onion Rings', description: 'Deep fried crispy onion rings', price: 5.50, category: 'Sides', isAvailable: true },
            { name: 'Chocolate Lava Cake', description: 'Warm cake with molten chocolate center', price: 7.00, category: 'Desserts', isAvailable: true },
            { name: 'Ice Cream Sundae', description: 'Vanilla ice cream with chocolate syrup', price: 6.00, category: 'Desserts', isAvailable: true },
            { name: 'Fresh Orange Juice', description: 'Freshly squeezed oranges', price: 4.00, category: 'Drinks', isAvailable: true },
            { name: 'Iced Coffee', description: 'Cold brewed coffee with milk', price: 4.50, category: 'Drinks', isAvailable: true },
            { name: 'Mineral Water', description: '500ml bottled water', price: 2.00, category: 'Drinks', isAvailable: true }
        ]);
        console.log('15 Menu items seeded successfully.');

        // 3. Seed Tables (6 tables)
        await Table.create([
            { tableNumber: 1, capacity: 2 },
            { tableNumber: 2, capacity: 2 },
            { tableNumber: 3, capacity: 4 },
            { tableNumber: 4, capacity: 4 },
            { tableNumber: 5, capacity: 6 },
            { tableNumber: 6, capacity: 8 }
        ]);
        console.log('6 Tables seeded successfully.');

        console.log('All data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();