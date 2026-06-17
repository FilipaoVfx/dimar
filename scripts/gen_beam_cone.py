"""
Light beam cone mesh – used separately in Three.js with additive blending.
Exports two GLBs:
  beam-cone.glb        – single straight beam (use with R3F + additive blend)
  moving-head-full.glb – fixture + beam combined, beam slightly angled
"""

import numpy as np
import trimesh
import trimesh.transformations as tf
import os

OUT_DIR = "/home/user/dimar/public/models"
os.makedirs(OUT_DIR, exist_ok=True)

C_BEAM   = [255, 255, 240, 60]   # warm white, semi-transparent
C_BEAM2  = [255, 180,  80, 40]   # orange tint falloff


def rot_x(deg):
    return tf.rotation_matrix(np.radians(deg), [1, 0, 0])


# ── Beam cone: tight at top (lens), wide at bottom ───────────────────────────
# Use a truncated cone (frustum): r_top small, r_bottom wide, tall
beam = trimesh.creation.cone(radius=0.90, height=3.5, sections=48)
# cone origin is at base; flip so it opens downward
beam.apply_transform(tf.rotation_matrix(np.pi, [1, 0, 0]))
beam.apply_translation([0, 0, 0])
beam.visual.vertex_colors = np.array(C_BEAM, dtype=np.uint8)

# Secondary softer outer cone
outer = trimesh.creation.cone(radius=1.40, height=3.8, sections=48)
outer.apply_transform(tf.rotation_matrix(np.pi, [1, 0, 0]))
outer.apply_translation([0, 0, 0])
outer.visual.vertex_colors = np.array(C_BEAM2, dtype=np.uint8)

# ── Export standalone beam ───────────────────────────────────────────────────
scene_beam = trimesh.Scene()
scene_beam.add_geometry(outer, node_name="beam_outer")
scene_beam.add_geometry(beam, node_name="beam_inner")

beam_path = os.path.join(OUT_DIR, "beam-cone.glb")
scene_beam.export(beam_path)
print(f"✓ beam-cone.glb  ({os.path.getsize(beam_path)/1024:.1f} KB)")

# ── Load fixture and combine ──────────────────────────────────────────────────
fixture_scene = trimesh.load(os.path.join(OUT_DIR, "moving-head-light.glb"))

combined_scene = trimesh.Scene()

# Add all fixture parts
for name, geom in fixture_scene.geometry.items():
    combined_scene.add_geometry(geom, node_name=f"fix_{name}")

# Add beam below the lens (lens is at y≈-0.50, z≈0.92 in fixture space)
beam_placed = beam.copy()
beam_placed.apply_translation([0, -0.50, 0.92])
combined_scene.add_geometry(beam_placed, node_name="beam")

outer_placed = outer.copy()
outer_placed.apply_translation([0, -0.50, 0.92])
combined_scene.add_geometry(outer_placed, node_name="beam_glow")

full_path = os.path.join(OUT_DIR, "moving-head-full.glb")
combined_scene.export(full_path)
print(f"✓ moving-head-full.glb  ({os.path.getsize(full_path)/1024:.1f} KB)")
