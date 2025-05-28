# Connecting OSC signal from p5.js > Sonic Pi
Here the sonic pi values should change based on how close you bring your fingers to your thumb. Each value is assigned to specific finger.

# Step 0

Install [node.js](https://nodejs.org/en)

# Step 1

`git clone https://github.com/ajaibghar-co/kf-handpose.git`

# Step 2
```bash
cd kf-handpose
npm i
npm run start
```

# Step 3
Open Sonic Pi

Add the code below:

```
live_loop :osc_rec do
  use_real_time
  a, b, c, d = sync "/osc*/p5js"

 ## play sample as per if condition for d value (pinky-thumb)
  if d >= 40 and d < 60
    sample :loop_weirdo
  end

## play midi note that's equal to integer value of a (index-thumb)
  note = a.to_i
  
  co = (60 + (b / 480.0) * 60).to_i
  sus = c
  rel = d
  sleep 0.125
  synth :dark_ambience, note: note, cutoff: 90, sustain: sus,
    release: rel, amp: d/100

##to print values
#puts "note: #{note}, cutoff: #{co}, sustain: #{sus}"
end
```
Hit "run"

# Step 4
Open `localhost:4567`

Move hands! 🙌 ✋
![hands](handpose.png)
