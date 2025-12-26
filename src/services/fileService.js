const fs = require('fs').promises;
const path = require('path');

class FileService {
  static async deleteFile(filepath) {
    try {
      const fullPath = path.join(process.cwd(), filepath);
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