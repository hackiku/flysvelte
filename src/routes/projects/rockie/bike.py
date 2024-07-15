# Given values
mass_of_bike = 150  # kg
mass_of_driver = 100  # kg
initial_speed_kmh = 100  # km/h
desired_delta_v_kmh = 50  # km/h
burn_time = 10  # seconds

# Calculate total mass
total_mass = mass_of_bike + mass_of_driver

# Speed conversions
initial_speed_ms = initial_speed_kmh / 3.6
initial_speed_kts = initial_speed_kmh * 0.539957
desired_delta_v_ms = desired_delta_v_kmh / 3.6
desired_delta_v_kts = desired_delta_v_kmh * 0.539957

# Calculate acceleration
acceleration = desired_delta_v_ms / burn_time

# Calculate required thrust
required_thrust = total_mass * acceleration

# Display results
results = {
    "Total Mass (kg)": total_mass,
    "Initial Speed (m/s)": initial_speed_ms,
    "Initial Speed (knots)": initial_speed_kts,
    "Desired Delta-V (m/s)": desired_delta_v_ms,
    "Desired Delta-V (knots)": desired_delta_v_kts,
    "Acceleration (m/s^2)": acceleration,
    "Required Thrust (N)": required_thrust
}

print(results)
