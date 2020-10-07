#!/usr/bin/env python

import base64
import imageio
import json
import numpy as np


def denormalize(chunk):
  image = base64.b64decode(chunk['data'])
  image = imageio.imread(image)
  image = np.asarray(image, dtype=np.float64)
  transform = lambda v: (v * chunk['hi'] / 255) + chunk['lo']

  return np.vectorize(transform)(image)


def deconvolve(cipher, kernel):
  kernel = np.fft.rfft2(kernel, s=cipher.shape)
  cipher = np.fft.rfft2(cipher)
  cipher = np.fft.irfft2(cipher / kernel)

  lo = cipher.min()
  hi = cipher.max()
  scale = 255 / (hi - lo)

  return ((cipher - lo) * scale).astype('uint8')


def main():
  with open('input/payload.json') as payload:
    data = json.load(payload)
    cipher = denormalize(data['cipher'])
    kernel = denormalize(data['kernel'])
    result = deconvolve(cipher, kernel)

    imageio.imwrite('output/result.png', result)


if __name__ == '__main__':
  main()
