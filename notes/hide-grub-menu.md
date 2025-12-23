---
title: Hide GRUB menu on boot by default.
description: How to hide the GRUB OS selection menu on every boot and boot into the default OS straight-away.
publishedOn: 2025-12-23
---

> *Disclaimer: I'm using a Fedora 43 install (KDE spin). Follow at your discretion*

## Steps

Open `/etc/default/grub` in your preferred editor and add/edit the following items:

```bash
GRUB_TIMEOUT=0

# Hide the message telling what OS is being booted.
GRUB_TIMEOUT_STYLE=hidden 
```

Then update GRUB with the following command:

```bash
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

## Selecting a different OS on boot

To select another OS while booting, simply hold the <kbd>Shift</kbd> key and change the selection from the menu as you usually do.
