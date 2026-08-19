import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'fs';
import { CreateAccountModal } from './App';

// Render Create Account - Step 3 (Welcome screen)
const step3Html = renderToStaticMarkup(
  <CreateAccountModal isOpen={true} onClose={() => {}} onSwitchToLogin={() => {}} onGoPrograms={() => {}} />
);

fs.writeFileSync('../../step3.html', step3Html);
console.log("Extracted step 3!");
