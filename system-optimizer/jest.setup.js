import { JSDOM } from 'jsdom';

// Set up DOM environment for tests
const dom = new JSDOM('<!DOCTYPE html>', {
  url: 'http://localhost',
  pretendToBeVisual: true
});

global.window = dom.window;
global.document = dom.window.document;
