"""
Procedural 3D model of a professional moving head stage light (GLB).
Based on reference images: yoke-style fixture with large front lens,
orange accent strips, and controller base unit.
"""

import numpy as np
import trimesh
import trimesh.transformations as tf
import os

OUT_DIR = "/home/user/dimar/public/models"
os.makedirs(OUT_DIR, exist_ok=True)

# ── Material colors (RGBA 0-255) ──────────────────────────────────────────────
C_BODY      = [28,  28,  30, 255]   # dark charcoal housing
C_BODY_MID  = [48,  48,  52, 255]   # slightly lighter panels
C_BASE      = [20,  20,  22, 255]   # controller base
C_ORANGE    = [255, 107,  0, 255]   # brand orange accent strips
C_SILVER    = [150, 150, 155, 255]  # chrome pivot
C_LENS_RING = [15,  15,  18, 255]   # lens outer barrel
C_LENS_BLUE = [55, 110, 210, 200]   # front glass (iridescent blue)
C_LENS_INN  = [22,  22,  25, 255]   # inner lens ring


def colored(mesh, rgba):
    mesh.visual.vertex_colors = np.array(rgba, dtype=np.uint8)
    return mesh


def rot_x(deg):
    return tf.rotation_matrix(np.radians(deg), [1, 0, 0])


def rot_y(deg):
    return tf.rotation_matrix(np.radians(deg), [0, 1, 0])


parts = []

# ── 1. CONTROLLER BASE ────────────────────────────────────────────────────────
base_box = trimesh.creation.box([1.30, 0.52, 0.18])
base_box.apply_translation([0, 0, 0.09])
parts.append(colored(base_box, C_BASE))

# Display panel inset (slightly lighter rectangle on front face)
display = trimesh.creation.box([0.55, 0.02, 0.10])
display.apply_translation([-0.10, -0.27, 0.09])
parts.append(colored(display, C_BODY_MID))

# Control section right side
controls = trimesh.creation.box([0.35, 0.02, 0.10])
controls.apply_translation([0.40, -0.27, 0.09])
parts.append(colored(controls, C_BODY_MID))

# Orange base accent strips
for sx in [-0.55, 0.55]:
    strip = trimesh.creation.box([0.04, 0.52, 0.03])
    strip.apply_translation([sx, 0, 0.085])
    parts.append(colored(strip, C_ORANGE))

# Mounting feet – 4 corners
for fx, fy in [(-0.50, -0.18), (0.50, -0.18), (-0.50, 0.18), (0.50, 0.18)]:
    foot = trimesh.creation.box([0.14, 0.10, 0.07])
    foot.apply_translation([fx, fy, -0.035])
    parts.append(colored(foot, C_BASE))

# ── 2. PIVOT / STEM ───────────────────────────────────────────────────────────
stem = trimesh.creation.cylinder(radius=0.065, height=0.18, sections=20)
stem.apply_translation([0, 0, 0.27])
parts.append(colored(stem, C_SILVER))

# ── 3. YOKE ARMS ─────────────────────────────────────────────────────────────
for side in [-1, 1]:
    arm = trimesh.creation.box([0.11, 0.14, 0.78])
    arm.apply_translation([side * 0.50, 0, 0.75])
    parts.append(colored(arm, C_BODY))

    # Orange accent on each arm
    acc = trimesh.creation.box([0.02, 0.07, 0.60])
    acc.apply_translation([side * 0.51, 0, 0.75])
    parts.append(colored(acc, C_ORANGE))

# Yoke top cross-bar
top_bar = trimesh.creation.box([1.00, 0.14, 0.12])
top_bar.apply_translation([0, 0, 1.16])
parts.append(colored(top_bar, C_BODY))

# Yoke pivot pins (cylinders connecting arm to head on both sides)
for side in [-1, 1]:
    pin = trimesh.creation.cylinder(radius=0.045, height=0.12, sections=16)
    pin.apply_transform(rot_y(90))
    pin.apply_translation([side * 0.45, 0, 0.72])
    parts.append(colored(pin, C_SILVER))

# ── 4. HEAD HOUSING ───────────────────────────────────────────────────────────
head = trimesh.creation.box([0.80, 0.75, 0.72])
head.apply_translation([0, 0, 0.72])
parts.append(colored(head, C_BODY))

# Side panels (ventilation / slightly different shade)
for side in [-1, 1]:
    panel = trimesh.creation.box([0.055, 0.62, 0.60])
    panel.apply_translation([side * 0.37, 0, 0.72])
    parts.append(colored(panel, C_BODY_MID))

# Orange accent strips on head sides (matching reference image)
for side in [-1, 1]:
    h_acc = trimesh.creation.box([0.03, 0.09, 0.50])
    h_acc.apply_translation([side * 0.365, 0.08, 0.70])
    parts.append(colored(h_acc, C_ORANGE))

# ── 5. LENS ASSEMBLY (front of head, tilted outward ~10 deg) ─────────────────
# Outer lens barrel
barrel = trimesh.creation.cylinder(radius=0.295, height=0.30, sections=40)
barrel.apply_transform(rot_x(90))
barrel.apply_translation([0, -0.345, 0.92])
parts.append(colored(barrel, C_LENS_RING))

# Lens barrel chamfer ring (slightly wider disc)
chamfer = trimesh.creation.cylinder(radius=0.31, height=0.04, sections=40)
chamfer.apply_transform(rot_x(90))
chamfer.apply_translation([0, -0.20, 0.92])
parts.append(colored(chamfer, C_BODY_MID))

# Inner focusing cylinder
inner_cyl = trimesh.creation.cylinder(radius=0.20, height=0.22, sections=32)
inner_cyl.apply_transform(rot_x(90))
inner_cyl.apply_translation([0, -0.375, 0.92])
parts.append(colored(inner_cyl, C_LENS_INN))

# Front glass disc
glass = trimesh.creation.cylinder(radius=0.185, height=0.025, sections=40)
glass.apply_transform(rot_x(90))
glass.apply_translation([0, -0.495, 0.92])
parts.append(colored(glass, C_LENS_BLUE))

# Lens edge ring
edge = trimesh.creation.cylinder(radius=0.295, height=0.025, sections=40)
edge.apply_transform(rot_x(90))
edge.apply_translation([0, -0.50, 0.92])
parts.append(colored(edge, C_LENS_RING))

# ── 6. EXPORT ────────────────────────────────────────────────────────────────
scene = trimesh.Scene()
for i, mesh in enumerate(parts):
    scene.add_geometry(mesh, node_name=f"part_{i:03d}")

out_path = os.path.join(OUT_DIR, "moving-head-light.glb")
scene.export(out_path)

size_kb = os.path.getsize(out_path) / 1024
print(f"✓ Exported: {out_path}  ({size_kb:.1f} KB)")
print(f"  Parts: {len(parts)}")

# Sanity check – dump bounding box
combined = trimesh.util.concatenate(parts)
bb = combined.bounds
print(f"  Bounding box: {np.round(bb[1]-bb[0], 3)}")
