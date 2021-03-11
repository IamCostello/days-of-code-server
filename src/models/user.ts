export interface User extends Document {
  username: string;
  saved: [
    {
      url: { type: String; required: true };
      archived: { type: Boolean; default: false };
    },
    { timestamps: true }
  ];
}
