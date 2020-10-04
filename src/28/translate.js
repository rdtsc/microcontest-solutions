'use strict';

module.exports = (stats, id) =>
{
  const result =
  {
    [`nb_cercles_${id}`]:    stats.circle,
    [`nb_triangles_${id}`]:  stats.triangle,
    [`nb_rectangles_${id}`]: stats.rectangle
  };

  return result;
};
