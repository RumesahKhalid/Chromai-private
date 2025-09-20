### Importing the libraries
import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator

### Preprocessing the training dataset
train_datagen = ImageDataGenerator(rescale=1./255, horizontal_flip=True)
training_set = train_datagen.flow_from_directory(
    'Dataset/train_dataset',
    target_size=(64, 64),
    batch_size=32,
    class_mode='binary'
)

### Preprocessing the test dataset
test_datagen = ImageDataGenerator(rescale=1./255)
test_set = test_datagen.flow_from_directory(
    'Dataset/test_dataset',
    target_size=(64, 64),
    batch_size=32,
    class_mode='binary'
)

### Print class indices for reference
print("Class indices:", training_set.class_indices)
# Example: {'Down': 0, 'Healthy': 1}

### Initializing the CNN
cnn = tf.keras.models.Sequential()

cnn.add(tf.keras.layers.Conv2D(filters=32, kernel_size=3, activation='relu', input_shape=[64, 64, 3]))
cnn.add(tf.keras.layers.MaxPool2D(pool_size=2, strides=2))

cnn.add(tf.keras.layers.Conv2D(filters=32, kernel_size=3, activation='relu'))
cnn.add(tf.keras.layers.MaxPool2D(pool_size=2, strides=2))

cnn.add(tf.keras.layers.Flatten())

cnn.add(tf.keras.layers.Dense(units=256, activation='relu'))
cnn.add(tf.keras.layers.Dense(units=128, activation='relu'))

cnn.add(tf.keras.layers.Dense(units=1, activation='sigmoid'))

### Compiling the CNN
cnn.compile(optimizer='nadam', loss='binary_crossentropy', metrics=['accuracy'])

### Training the CNN
solution = cnn.fit(x=training_set, validation_data=test_set, epochs=25)

### Saving model + class indices
cnn.save('model.h5')

# Save class indices to a file
import json
with open("class_indices.json", "w") as f:
    json.dump(training_set.class_indices, f)

print("Model and class indices saved successfully!")
