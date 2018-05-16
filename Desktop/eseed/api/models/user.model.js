var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: false
  },
  password: {
   type: String,
   required: true,
   trim: false
 },
  MNumber: {
    type: Number,
    required: false
  },
  hireDate: {
    type: Date,
    required: false
  },
  Day: {
    type: String,
    trim: true,
    lowercase: true,
    required: false
  },
  WorkingHours: {
    type: Number,
    required: false
  },
  present: {
    type: Boolean,
    required: false
  },
  sick: {
    type: Boolean,
    required: false
  },
  Dayoff: {
    type: String,
    trim: true,
    lowercase: true,
    required: false
  },

  updatedAt: Date
});


// Override the transform function of the schema to delete the password before it returns the object
if (!userSchema.options.toObject) {
  userSchema.options.toObject = {};
}
userSchema.options.toObject.transform = (document, transformedDocument) => {
  delete transformedDocument.password;
  return transformedDocument;
};

mongoose.model('User', userSchema);
