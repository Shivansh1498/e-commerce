### Installation

**Clone the repository:**

```bash
git clone https://github.com/Shivansh1498/e-commerce.git
cd e-commerce
```

**Install dependencies:**

```bash
npm install or npm i
```

**Start the development server:**

```bash
npm run dev
```

The app should be running at http://localhost:5173/

### Running Tests

**Run Cypress Test Runner:**

```bash
npx cypress open
```

Run this command in another terminal and make sure you are running project in localhost at
http://localhost:5173/ before running tests

- After cypress window opens select E2E testing
- Select your prefered browser and click on Start E2E testing button
- Click on the file `appFlow.cy.js` in E2E specs section on Specs page.
- A basic test will be performed after the click

### Build for Production

```bash
npm run build
```

**Preview Build**

```bash
npm run preview
```
