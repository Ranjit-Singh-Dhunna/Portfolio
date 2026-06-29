from PIL import Image
import os
import glob

for filepath in glob.glob("public/stickers/cute_*.jpg"):
    img = Image.open(filepath).convert("RGBA")
    datas = img.getdata()
    
    # We will do a very simple approach:
    # Since it's a sticker on a white background, we just floodfill from (0,0)
    
    width, height = img.size
    
    # Create a list to modify pixels
    new_data = list(datas)
    
    def get_idx(x, y):
        return y * width + x
        
    def is_white(r, g, b, a):
        return r > 240 and g > 240 and b > 240
        
    visited = set()
    stack = [(0,0), (width-1,0), (0,height-1), (width-1,height-1)]
    
    while stack:
        x, y = stack.pop()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        idx = get_idx(x, y)
        r, g, b, a = new_data[idx]
        
        if is_white(r, g, b, a):
            # make transparent
            new_data[idx] = (255, 255, 255, 0)
            
            # add neighbors
            if x > 0: stack.append((x-1, y))
            if x < width-1: stack.append((x+1, y))
            if y > 0: stack.append((x, y-1))
            if y < height-1: stack.append((x, y+1))

    img.putdata(new_data)
    new_filepath = filepath.replace(".jpg", ".png")
    img.save(new_filepath, "PNG")
    os.remove(filepath)
    print(f"Processed {new_filepath}")

