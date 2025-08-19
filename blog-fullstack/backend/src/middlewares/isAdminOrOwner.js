export const isAdminOrOwner = (getResourceUserId) => {
  return async (req, res, next) => {
    try {
      const resourceUserId = await getResourceUserId(req);
      if (!resourceUserId) return res.status(404).json({ message: 'Resource not found' });
      if (req.user?.role === 'admin' || String(req.user?.id) === String(resourceUserId)) return next();
      return res.status(403).json({ message: 'Forbidden' });
    } catch (e) {
      return res.status(404).json({ message: 'Resource not found' });
    }
  };
};
