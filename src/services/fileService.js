const fs = require('fs').promises;
const path = require('path');

class FileService {
  static async deleteFile(filepath) {
    try {
      if (!filepath) return false;

      let relativePath = filepath;
      if (typeof relativePath === 'string' && (relativePath.startsWith('http://') || relativePath.startsWith('https://'))) {
        try {
          const u = new URL(relativePath);
          relativePath = u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname;
        } catch (e) {
          // fallback: remove protocol and host if possible
          relativePath = relativePath.replace(/^https?:\/\//, '').split('/').slice(1).join('/');
        }
      }

      const fullPath = path.join(process.cwd(), relativePath);
      await fs.unlink(fullPath);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  static getFileUrl(req, filepath) {
    if (!filepath) return null;
    const protocol = req.protocol;
    const host = req.get('host');
    return `${protocol}://${host}/${filepath}`;
  }
}

module.exports = FileService;